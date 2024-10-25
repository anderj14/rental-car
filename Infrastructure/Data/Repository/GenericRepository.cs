
using System.Linq.Expressions;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace Infrastructure.Data.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly RentalContext _context;

        public GenericRepository(RentalContext context)
        {
            _context = context;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<T> GetEntityWithUserSpec(Expression<Func<T, bool>> filter, ISpecification<T> spec)
        {
            var query = ApplySpecification(spec).Where(filter);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }


        public async Task<IReadOnlyList<T>> ListAllByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec, int pageIndex, int pageSize)
        {
            var query = ApplySpecification(spec)
            .Where(filter)
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize);

            return await query.ToListAsync();
        }


        public async Task<T> GetByConditionAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(predicate);
        }

        public async Task<IEnumerable<T>> FindAsync(
            Expression<Func<T, bool>> predicate,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            bool disableTracking = true)
        {
            IQueryable<T> query = _context.Set<T>();

            // Opcionalmente deshabilita el seguimiento de cambios (tracking) si es necesario
            if (disableTracking)
            {
                query = query.AsNoTracking();
            }

            // Aplica la condición de búsqueda
            query = query.Where(predicate);

            // Aplica las inclusiones de relaciones si se proporcionan
            if (include != null)
            {
                query = include(query);
            }

            // Retorna los resultados de la consulta
            return await query.ToListAsync();
        }


        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        public async Task<int> CountByUserAsync(Expression<Func<T, bool>> filter, ISpecification<T> spec)
        {
            return await ApplySpecification(spec).Where(filter).CountAsync();
        }

        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }
    }
}